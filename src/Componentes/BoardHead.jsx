import React, { useEffect, useState } from 'react';
import '../style/BoardHead.css';

export default function BoardHead({ flagCount, onModeChange, onReset, elapsedTime}) {
    const handleModeChange = (newmode) => {
        onModeChange(newmode);
    };

    const handleResetClick = () => {
        onReset();
    };

    return (
        <div className='board-head'>
            <div className="flag-count">
                🚩{flagCount}
            </div>
            <div className="mode-buttons">
                <button className='modo_jogo' onClick={() => handleModeChange({ rows: 9, columns: 9, mines: 10 })}>Beginner</button>
                <button className='modo_jogo' onClick={() => handleModeChange({ rows: 16, columns: 16, mines: 40 })}>Intermediate</button>
                <button className='modo_jogo' onClick={() => handleModeChange({ rows: 16, columns: 30, mines: 99 })}>Expert</button>
            </div>
            <button className="reset" onClick={handleResetClick}>Reset</button>
            <div className='timer'>
                {formatTime(elapsedTime)}
            </div>
        </div>
    );
}

function formatTime(time) {
    if (typeof time !== 'number' || isNaN(time)) {
        return '0:00';
    }
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
