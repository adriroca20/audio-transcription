import React, { useState, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface AudioRecorderProps {
  onTranscriptionUpdate: (text: string) => void;
  setSupportsSpeechRecognition: (supported: boolean) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onTranscriptionUpdate,
  setSupportsSpeechRecognition,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    setIsRecording(listening);
  }, [listening]);
  useEffect(() => {
    setSupportsSpeechRecognition(browserSupportsSpeechRecognition);
  }, [browserSupportsSpeechRecognition, setSupportsSpeechRecognition]);

  const startRecording = async () => {
    try {
      SpeechRecognition.startListening({ continuous: true, language: "es-ES" });
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Unable to access microphone. Please check your permissions.");
    }
  };

  const stopRecording = () => {
    setIsProcessing(true);
    SpeechRecognition.stopListening();
    onTranscriptionUpdate(transcript);
    console.log("Transcript:", transcript);
    setTimeout(() => setIsProcessing(false), 1000); // Give time for final processing
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-center items-center gap-1 flex-col">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`
          relative flex items-center justify-center gap-2 px-6 py-3 rounded-full
          text-white font-medium transition-all duration-200
          ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }
          ${isProcessing ? "opacity-75 cursor-not-allowed" : ""}
          shadow-lg hover:shadow-xl
        `}
        >
          {isProcessing ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isRecording ? (
            <>
              <MicOff className="w-5 h-5" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Start Recording
            </>
          )}
        </button>
        <button
          onClick={()=>{
            resetTranscript();
            onTranscriptionUpdate("");
          }}
          className="text-sm text-gray-500 mt-2 border-b border-gray-500 hover:text-gray-700"
        >
          Clear Transcript
        </button>
      </div>

      {isRecording && (
        <div className="flex items-center gap-2 text-red-500">
          <span className="animate-pulse">●</span>
          Recording in progress...
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
