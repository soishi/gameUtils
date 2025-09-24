/**
 * ハンバーガーメニューコンポーネント
 */

"use client";

import { useState } from "react";

interface HamburgerMenuProps {
  onHistoryClick: () => void;
  canUndo: boolean;
  onUndoClick: () => void;
}

export const HamburgerMenu = ({
  onHistoryClick,
  canUndo,
  onUndoClick,
}: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleHistoryClick = () => {
    onHistoryClick();
    setIsOpen(false);
  };

  const handleUndoClick = () => {
    onUndoClick();
    setIsOpen(false);
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      {/* ハンバーガーボタン */}
      <button
        onClick={toggleMenu}
        className="relative z-10 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-full flex flex-col items-center justify-center gap-1 hover:bg-gray-700/80 transition-colors"
        aria-label="メニュー"
        aria-expanded={isOpen}
      >
        <div
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <div
          className={`w-6 h-0.5 bg-white transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* メニューオーバーレイ */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-0"
          onClick={toggleMenu}
        />
      )}

      {/* メニューパネル */}
      <div
        className={`absolute top-14 right-0 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-2 min-w-[200px]">
          {/* 履歴ボタン */}
          <button
            onClick={handleHistoryClick}
            className="w-full px-4 py-3 text-left hover:bg-gray-700/50 rounded-md transition-colors flex items-center gap-3"
          >
            <span className="text-xl">📊</span>
            <span>履歴・統計</span>
          </button>

          {/* Undoボタン */}
          <button
            onClick={handleUndoClick}
            disabled={!canUndo}
            className={`w-full px-4 py-3 text-left rounded-md transition-colors flex items-center gap-3 ${
              canUndo
                ? "hover:bg-gray-700/50 text-white"
                : "text-gray-500 cursor-not-allowed"
            }`}
          >
            <span className="text-xl">↶</span>
            <span>やり直し (Z)</span>
          </button>

          <div className="border-t border-gray-600/50 my-2" />

          {/* ショートカット説明 */}
          <div className="px-4 py-3 text-sm text-gray-400">
            <div className="font-medium mb-2">ショートカット</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Space</span>
                <span>+1</span>
              </div>
              <div className="flex justify-between">
                <span>↓</span>
                <span>-1</span>
              </div>
              <div className="flex justify-between">
                <span>Z</span>
                <span>やり直し</span>
              </div>
              <div className="flex justify-between">
                <span>→</span>
                <span>勝ち確定</span>
              </div>
              <div className="flex justify-between">
                <span>←</span>
                <span>負け確定</span>
              </div>
              <div className="flex justify-between">
                <span>H</span>
                <span>履歴</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
