# Mobile Translator Application
Stephanie Sarambo \
December 7, 2025 \
CSCI 6905 - Mobile Computing \
East Carolina University \
Professor Brian Dietrick

## Overview
This repository contains the code for a mobile translation application, meant for an Android device. 

Note: this application should work for both Android and iOS, but the Text-to-Speech functionality is only supported on Android devices.

Users are able to select their starting language, type in a word/phrase, select a target language, and click 'Translate'. The application will translate the entered word/phrase into the selected language. Users also have the option to play an audio recording of the text. They can also toggle the theme of the application between light and dark modes.

In order to run this application, you need an Android emulator (or physical device) with the Expo Go app installed, and Docker with LibreTranslate and OpenTTS running locally. LibreTranslate needs to be running on port 5001, and OpenTTS on port 5500. See Getting Started for more details on starting this application.

## Getting Started
1. Ensure you have Node.js installed. In the same directory as this repository, run:
    ```zsh
    node -v
    ```
    If you don't have Node.js installed, install it [here](https://nodejs.org/en).

    Note: npm should automatcally install with Node.js, but confirm its installation with:
    ```zsh
    npm -v
    ```
2. Ensure you have Docker installed. In the same directory as this repository, run:
    ```zsh
    docker -v
    ```
    If you don't have Docker installed, install it [here](https://www.docker.com/get-started/).

    Note: You need to download Docker Desktop to run this application on your device. Docker was used to host the API servers for the translation and the Text-to-Speech services on a local device. This will also require you to download the free servers for both services, explained in the next steps.
3. Start the Docker Container

    As previously mentioned, this application uses two open source APIs. In order for the app to work on another device, Docker needs to be hosting these services on the local device.
    Navigate into the directory with the `docker-compose.yml` file.
    ```zsh
    cd translator-app/src/Docker
    ```
    Then, run the following command to create and run the container:
    ```zsh
    docker-compose up -d
    ```
    If that gives you an error, try:
    ```zsh
    docker compose up -d
    ```
    After this, navigate back to the root directory of this repository.
4. Install dependencies by running:
    ```zsh
    npm install
    ``` 
5. Run the Android emulator.
    ```zsh
    emulator -avd <EMULATOR_NAME>
    ```
6. On the Android emulator, ensure that you have the Expo Go app installed. You can download this in the Google Play store on the emulator. If that doesn't work, download it [here](https://expo.dev/go), open your file explorer/finder/etc., and drag and drop the application onto the emulator.
7. In the terminal, navigate to the `translator-app` directory:
    ```zsh
    cd translator-app
    ```
    Run the following command to start the application server:
    ```zsh
    npx expo start
    ```
8. On the emulator, open Expo Go, and click 'Enter URL'. Copy and paste the Metro URL (it will look like this, `exp://<IP-ADDRESS>:<PORT-NUMBER>`), and click 'Connect'.

## Technologies Used
- VS Code
- React Native
- Expo
- Docker
- LibreTranslate
- OpenTTS
- Android Emulator

## Planned Features That Were Implemented
1. Translation function (Text-to-Text Translation)
2. Audio output (on click)
3. List of supported languages
4. Changeable Themes
5. Basic Navigation

## Planned Features That Were Not Implemented
1. Audio-to-Audio Translation
    - I could not figure out how to enable the microphone of the Android emulator
    - I ultimately ran out of time.
2. Audio-in Translation
    - The same reasons as above: running out of time and figuring out how to enable the microphone.
3. Resetting to defaults at the click of a button
    - I kind of forgot that I wanted to implement this feature. I think it could have been easy, but I realized too late that I wanted to do that.