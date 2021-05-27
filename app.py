import uuid
import soundfile
from flask import Flask, jsonify ,request,redirect, url_for,flash
import librosa
import transformers
import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Tokenizer
from flask_cors import CORS,cross_origin
from keras.models import load_model
import os
import pickle 
import numpy as np
from keras.preprocessing.sequence import pad_sequences
from werkzeug.utils import secure_filename
app = Flask(__name__)
CORS(app, support_credentials=True)
UPLOAD_FOLDER = "/d/Bureau/PFE/Fisproject/uploads"
app.config['UPLOAD_FOLDER']=UPLOAD_FOLDER
model=load_model("intent_analysis_model.h5")
pickle_in=open("tokenizer.pickle","rb")
tokenizer=pickle.load(pickle_in)
pickle_in=open("labels.pickle","rb")
labels=pickle.load(pickle_in)
transcription=""
emo_reco=load_model("emtion_recognition.h5")
def extract_feature(file_name, **kwargs):
   
    mfcc = kwargs.get("mfcc")
    chroma = kwargs.get("chroma")
    mel = kwargs.get("mel")
    contrast = kwargs.get("contrast")
    tonnetz = kwargs.get("tonnetz")
    with soundfile.SoundFile(file_name) as sound_file:
        X = sound_file.read(dtype="float32")
        X = librosa.to_mono(X)
        sample_rate = 22050
        if chroma or contrast:
            stft = np.abs(librosa.stft(X))
        result = np.array([])
        if mfcc:
            mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=40).T, axis=0)
            result = np.hstack((result, mfccs))
        if chroma:
            chroma = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T,axis=0)
            result = np.hstack((result, chroma))
        if mel:
            mel = np.mean(librosa.feature.melspectrogram(X, sr=sample_rate).T,axis=0)
            result = np.hstack((result, mel))
        if contrast:
            contrast = np.mean(librosa.feature.spectral_contrast(S=stft, sr=sample_rate).T,axis=0)
            result = np.hstack((result, contrast))
        if tonnetz:
            tonnetz = np.mean(librosa.feature.tonnetz(y=librosa.effects.harmonic(X), sr=sample_rate).T,axis=0)
            result = np.hstack((result, tonnetz))
    return result
def emotionanalysis(pth):
    l={'surprised':0.0,'sad':1.0,'neutral':3.0,'angry':4.0}
    features = extract_feature(pth, mfcc=True, chroma=True, mel=True)
    x=[]
    x.append(features)
    x=np.array(x)
    x = np.expand_dims(x, axis=2)
    res=emo_reco.predict(x)
    res=np.argmax(res, axis=1)

    key_list = list(l.keys())
    val_list = list(l.values())
    position = val_list.index(res[0])
    return(key_list[position])



def asr (pth) :
    tokenizer= Wav2Vec2Tokenizer.from_pretrained("facebook/wav2vec2-base-960h")
    model= Wav2Vec2ForCTC.from_pretrained("facebook/wav2vec2-base-960h")
    input_audio, _ = librosa.load(pth, sr=16000)
    input_values = tokenizer(input_audio, return_tensors="pt").input_values
    logits = model(input_values).logits
    predicted_ids = torch.argmax(logits, dim=-1)
    transcription = tokenizer.batch_decode(predicted_ids)[0]
    return transcription
def intent(intent) :
    exp = tokenizer.texts_to_sequences([intent])
    padd = pad_sequences(exp, maxlen=250) 
    pred = model.predict(padd)
    predi = np.argmax(pred, axis=1)
    res=labels[predi[0]]
    return res
@app.route('/uploader', methods=['GET','POST']) 
def addaudio():
    f = request.files['file']
    audio_name=secure_filename(f.filename)
    f.save(audio_name)
    transcription=asr(audio_name)
    os.remove(audio_name)
    return( jsonify(transcription))
@app.route('/emotion', methods=['GET','POST']) 
def emotionrecognition() :
    res=emotionanalysis("./angularproject/src/assets/sample.wav")
    return( jsonify(res))

@app.route('/', methods=['GET'])
def index():
    transcription=asr("./angularproject/src/assets/sample.wav")
    return(jsonify(transcription))   
    

@app.route('/uploadersentiment', methods=['GET','POST']) 
def addsentiment():
    f = request.files['file']
    audio_name=secure_filename(f.filename)
    f.save(audio_name)
    res=emotionanalysis(audio_name)
    return( jsonify(res))
@app.route('/intent', methods=['GET','POST']) 
def intentanalysis() : 
    
    f=request.get_data()
    f=str(f)
    print(f)
    res=intent(f)
    return( jsonify(res))


if __name__ == "__main__":
    app.run(debug=True)