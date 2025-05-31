"use client"

import { useState } from "react";

export default function Element() {
    const [audio, setAudio] = useState(0);

    const audios = [
        {
            id: 1,
            title: "Audio 1",
            src: "/audios/01.mp3"
        },
        {
            id: 2,
            title: "Audio 2",
            src: "/audios/02.mp3"
        },
        {
            id: 3,
            title: "Audio 3",
            src: "/audios/03.mp3"
        },
    ];

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

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* 現在再生中の音声タイトルを表示 */}
            <h2 className="mb-4 text-xl font-bold">
                {audios[audio].title}
            </h2>
            {/* 音声プレイヤー */}
            <audio src={audios[audio].src} controls className="mb-4" />
            {/* 次へ・前へボタン */}
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
        </div>
    );
}
