import React, { useState } from "react";
import { Headphones } from "lucide-react";
import AudioRecorder from "./components/AudioRecorder";
import TranscriptEditor from "./components/TranscriptEditor";

function App() {
  const [transcript, setTranscript] = useState("");
  const [supportsSpeechRecognition, setSupportsSpeechRecognition] =
    useState(true);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {!supportsSpeechRecognition ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">
              This browser does not support speech recognition.
            </span>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="flex items-center justify-center mb-4">
                <Headphones className="w-12 h-12 text-blue-500" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Audio Transcription
              </h1>
              <p className="text-lg text-gray-600">
                Record your voice and get instant transcription
              </p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="space-y-8">
                <AudioRecorder
                  onTranscriptionUpdate={setTranscript}
                  setSupportsSpeechRecognition={setSupportsSpeechRecognition}
                />
                <div className="border-t border-gray-200 my-8" />
                <TranscriptEditor
                  transcript={transcript}
                  onTranscriptChange={setTranscript}
                />
              </div>
            </div>

            {/* Footer */}
            <footer className="text-center text-sm text-gray-500">
              <p>
                Note: This application requires microphone permissions to work
                properly.
              </p>
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
