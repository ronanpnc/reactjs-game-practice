import React from 'react';

function Log({ logMessages })
{
    return (
        <section id="log" className="container">
            <h2>Battle Log</h2>
            <ul>
                {logMessages.map((log, index) => (
                    <li key={index}>
                        <span className={log.isPlayer ? 'log--player' : 'log--monster'} >
                            {log.isPlayer ? 'Player' : 'Monster'}
                        </span>
                        <span className={log.isDamage ? 'log--damage' : 'log--heal'} >
                            {log.text }
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Log;