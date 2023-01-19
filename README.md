# DeepX : A Voice Based Cutomer Service Virtual Assistant 
![Screenshot](screenshot1.PNG)

Voice assistants can be extremely useful for financial services institutions as it can actively enhance the customer experience, from speeding up issue resolution
to increase engagement. Our system DeepX integrates transcription of customer complaints with analysis of their content then responds with the results.

# Running on native machine

## Clone the project
1)Install git v2.31.1

2)Open Visual Studio Code

3)Make sure under setting git enable is checked 

4)Click on view>command Palette>Git clone

5)Put the repository URL ```https://github.com/yassamine-atn/Project.git```

## Dependencies

**FrontEnd**

- Nodejs v14.16.1

 - CLI v6.14.12
 
- Bootstrap ```npm install bootstrap``` 

- In ```angular.json``` styles add  ```node_modules/bootstrap/dist/css/bootstrap.css```

- RecordRTC ```npm install recordrtc```

**BackEnd**

- Python v3.9.4

 - pip
 
- Flask ```pip install flask```

- Flask_cors ```pip install flask_cors```

- Anaconda3

- Set Anaconda Python interpreter path in Visual Studio Code : Add ```c:/users/username/Anaconda3``` and ```c:/users/username/Anaconda3/scripts``` to the system environment variables

- Librosa ```pip install librosa```

- Transformers ```pip install transformers```

- Torch ```pip install torch```

- Keras ```pip install keras```

- Pickle ```pip install pickle```

- Tensorflow ```pip install tensorflow```

- Soundfile ```pip install soundfile``` 


## Start The Project

1) open a terminal to start flask server 

```python app.py```

2)   open another terminal to start angular server

```cd angularproject```


 ``` ng serve --open```

# Speech Recognition

## Scripts
**For more details make sure to visit these files to look at script arguments and description**


 ```speech recognition/fine_tuning/Fine_tuning_Wav2Vec2_for_English_ASR.ipynb ``` is used to fine tune the model on the Timit dataset

 ```speech recognition/fine_tuning/my_data_training.ipynb ``` is used to to train my own dataset on the model 

 ```speech recognition/fine_tuning/my_test_data.ipynb ``` is used to create my test dataset 
 
 ```speech recognition/fine_tuning/Speech_recognition_demo.ipynb``` describes how to use the pretrained model 

     
 ```speech recognition/fine_tuning/my_train__data_.ipynb ```is used to create my train dataset

Note: this approache didn t give good results due to the quality of the microphone and other factors ( i ve recorded some samples with my mic ) 

# Intent Analysis

## Scripts
**For more details make sure to visit these files to look at script arguments and description**

```speech recognition/intent analysis/Intent_analysis.ipynb``` is used create the model 

```speech recognition/intent analysis/intent_analysis_demo.ipynb``` is  demo of how to use the created model 

```intent_analysis_model.h5``` is the pretrained model for Intent Analysis 

# Speech Emotion Recognition 
## Scripts
**For more details make sure to visit these files to look at script arguments and description**

