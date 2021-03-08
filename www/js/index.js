/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
  // Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyD2aVoSlFgPotgP51Cpt1vUKf8MFTo3G_w",
    authDomain: "cordova-8483c.firebaseapp.com",
    projectId: "cordova-8483c",
    storageBucket: "cordova-8483c.appspot.com",
    messagingSenderId: "609864107644",
    appId: "1:609864107644:web:1266d0c817388fccfc2bf9"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
//dataBase = firebase.database().ref('cordova')
storage = firebase.storage().ref();
img =[];

function upImg(x){
    for(i=0;i<x.length;i++){
        var message = x[i];
        storage.putString(message, 'data_url').then(function(snapshot) {
            console.log('Uploaded a data_url string!');
        });
    }
}

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    document.getElementById('mostrar').addEventListener('click',mostrar);

    document.getElementById("tomarfoto").addEventListener ("click", tomarfoto); 

    document.getElementById("cargarFoto").addEventListener("click", cargarFoto);
    document.getElementById("networkInfo").addEventListener("click", networkInfo);
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
}

function mostrar() {
    alert('version cordova : '+device.cordova+"\n"+
            'model : '+device.model+"\n"+
            'plataforma : '+device.platform+"\n")
    
}

function tomarfoto() { 
    navigator.camera.getPicture(onSuccess, onFail, {  
        quality: 50, 
        destinationType: Camera.DestinationType.FILE_URL
    });  

    function onSuccess(imageData) { 
        var image = document.getElementById('myImage'); 
        image.src = imageData;  
        img.push(image.src)
    }  
    
    function onFail(message) { 
        alert('error: ' + message); 
    } 
}

function cargarFoto() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URL ,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });

    function onSuccess(imageData) { 
        var image = document.getElementById('myImage'); 
        image.src = imageData; 
        console.log(imageData)
    }  

    function onFail(message) {
        alert('error: ' + message);
    }
}

function networkInfo() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    alert('Connection type: ' + states[networkState]); 
    if(connection.WIFI==true){
        onOnline()
    }
}

function onOffline() {
    alert('You are now offline!');
}

function onOnline() {
    alert('You are now online!');
    
    function upImg(x){
        for(i=0;i<x.length;i++){
            var message = x[i];
            storage.putString(message, 'data_url').then(function(snapshot) {
                console.log('Uploaded a data_url string!');
            });
        }
    }
    upImg(img)
}
