import React from "react";
import { Copy } from "lucide-react";
interface TranscriptEditorProps {
  transcript: string;
  onTranscriptChange: (text: string) => void;
}

const TranscriptEditor: React.FC<TranscriptEditorProps> = ({
  transcript,
  onTranscriptChange,
}) => {
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  const getTooltipClass = () => {
    return copied
      ? "opacity-100 translate-y-0 pointer-events-auto"
      : "opacity-0 translate-y-2 pointer-events-none";
  };
  return (
    <div className="w-full">
      <header className="flex items-center justify-between">
        <label
          htmlFor="transcript"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Transcript
        </label>
        <button
          onClick={() => {
            navigator.clipboard.writeText(transcript);
            setCopied(true);
          }}
          className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1 relative"
        >
          <Copy className="w-5 h-5 " />
          Copy transcription
          <span
            className={`"text-sm text-blue-800 py-1 px-2 rounded absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white p-1 rounded shadow-lg transition-all" ${getTooltipClass()}`}
          >
            Copied!
          </span>
        </button>
      </header>
      <textarea
        id="transcript"
        value={transcript}
        onChange={(e) => onTranscriptChange(e.target.value)}
        className="w-full h-64 p-4 text-gray-900 border border-gray-200 rounded-lg 
                 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 resize-none transition-all duration-200"
        placeholder="Your transcribed text will appear here..."
      />
      <p className="mt-2 text-sm text-gray-500">
        {transcript.length} characters |{" "}
        {transcript.split(/\s+/).filter(Boolean).length} words
      </p>
    </div>
  );
};

export default TranscriptEditor;
