import { Audio } from 'expo-av';
import { Alert } from 'react-native';

export async function playAudio(blob: Blob): Promise<void> {
    try {
        const reader = new FileReader();
        
        return new Promise<void>((resolve, reject) => {
            reader.onload = async () => {
                try {
                    const uri = reader.result as string;

                    const sound = new Audio.Sound();
                    
                    sound.setOnPlaybackStatusUpdate(async (status) => {
                        if (!status.isLoaded) return;

                        if (status.didJustFinish) {
                            await sound.unloadAsync();
                            resolve();
                        }
                    })

                    await sound.loadAsync({ uri });
                    await sound.playAsync();
                } catch (error : any) {
                    // console.error('Error loading audio:', error);
                    Alert.alert(
                        'Audio Playback Error',
                        error.message || 'Failed to play audio. Please try again.',
                        [{ text: "OK", onPress: () => console.log("Alert dismissed") }]
                    );
                    reject(error);
                }
            };

            reader.onerror = () => {
                // console.error('Error reading blob:', reader.error);
                Alert.alert(
                    'Audio Read Error',
                    reader.error?.message || 'Failed to read audio data. Please try again.',
                    [{ text: "OK", onPress: () => console.log('Alert dismissed') }]
                );
                reject(reader.error);
            };

            reader.readAsDataURL(blob);
        });
    } catch (error: any) {
        // console.error('Error playing audio:', error);
        Alert.alert(
            'Audio Playback Error',
            error.message || 'Failed to play audio. Please try again.',
            [{ text: "OK", onPress: () => console.log("Alert dismissed") }]
        );
        throw error;
    }
}