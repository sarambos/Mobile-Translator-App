import { Audio } from "expo-av";

export async function playAudio(blob: Blob): Promise<void> {
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
        });

        await sound.loadAsync({ uri });
        await sound.playAsync();
      } catch (error: any) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(blob);
  });
}
