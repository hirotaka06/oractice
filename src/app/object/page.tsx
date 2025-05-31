"use client";

import { useEffect, useMemo, useState } from "react";

export default function Object() {
  const [audio, setAudio] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  ); //引数にnewAudio()

  const audios = useMemo(() => {
    if (typeof window !== "undefined") {
      return [
        {
          id: 1,
          title: "Audio 1",
          src: "/audios/01.mp3",
        },
        {
          id: 2,
          title: "Audio 2",
          src: "/audios/02.mp3",
        },
        {
          id: 3,
          title: "Audio 3",
          src: "/audios/03.mp3",
        },
      ];
    }
    return [];
  }, []);

  // 次の音声に切り替える関数
  const handleNext = () => {
    if (audio < audios.length - 1) {
      setAudio(audio + 1);
    }
  };

  // 前の音声に戻る関数
  const handlePrevious = () => {
    if (audio > 0) {
      setAudio(audio - 1);
    }
  };

  useEffect(() => {
    // timeupdateイベント時に実行される関数を定義
    const handleTimeUpdate = () => {
      // 現在の再生位置をコンソールに表示
      console.log(audioElement?.currentTime + " / " + audioElement?.duration);
      setCurrentTime(audioElement?.currentTime || 0);
      setTotalTime(audioElement?.duration || 0);
    };

    const handleEnded = () => {
      console.log("ended");
    };

    // イベントリスナーを追加
    audioElement?.addEventListener("timeupdate", handleTimeUpdate);
    audioElement?.addEventListener("ended", handleEnded);

    // クリーンアップ関数でイベントリスナーを解除
    return () => {
      audioElement?.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement?.removeEventListener("ended", handleEnded);
    };
  }, [audio, audioElement]);

  useEffect(() => {
    setAudioElement(new Audio(audios[audio].src)); //
    // if (audioElement) {
    //     audioElement.src = audios[audio].src;
    // }
  }, [audio, audios]);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {/* 再生ボタン */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => audioElement?.play()}
        >
          再生
        </button>
        {/* 一時停止ボタン */}
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => audioElement?.pause()}
        >
          一時停止
        </button>
        {/* リセットボタン */}
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => {
            if (audioElement) {
              audioElement.currentTime = 0;
              audioElement.pause();
            }
          }}
        >
          リセット
        </button>
        {/* 音量調整ボタン */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            if (audioElement) {
              audioElement.volume = 0.5;
            }
          }}
        >
          音量50%
        </button>
        {/* シーク（再生位置移動）ボタン */}
        {[10, 20, 30, 40].map((sec) => (
          <button
            key={sec}
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={() => {
              if (audioElement) {
                audioElement.currentTime = sec;
              }
            }}
          >
            {sec}秒
          </button>
        ))}
      </div>
      {/*
          - 各ボタンには色分けとpadding（余白）を付けて見やすくしています。
          - map関数を使って、10秒・20秒・30秒・40秒のシークボタンをまとめて生成しています。
          - 初心者の方は、mapは「配列の各要素に同じ処理をする」ための便利な方法です。
        */}
      <div>
        <button
          className="bg-blue-500 text-white p-2 rounded-md mr-2"
          onClick={handlePrevious}
          disabled={audio === 0}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleNext}
          disabled={audio === audios.length - 1}
        >
          Next
        </button>
      </div>
      <p>
        {currentTime.toFixed(1)} / {totalTime.toFixed(1)}
      </p>
    </div>
  );
}
