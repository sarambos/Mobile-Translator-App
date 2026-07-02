import { Audio } from 'expo-av';

export async function playAudio(blob: Blob) {
    try {
        const reader = new FileReader();
        
        return new Promise<Audio.Sound>((resolve, reject) => {
            reader.onload = async () => {
                try {
                    const uri = reader.result as string;

                    const sound = new Audio.Sound();
                    await sound.loadAsync({ uri });
                    await sound.playAsync();

                    resolve(sound);
                } catch (error) {
                    console.error('Error loading audio:', error);
                    reject(error);
                }
            };

            reader.onerror = () => {
                console.error('Error reading blob:', reader.error);
                reject(reader.error);
            };

            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error playing audio:', error);
        throw error;
    }
}