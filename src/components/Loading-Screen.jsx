import '../styles/Loading-Screen.css';
import pikachuRunning from '../assets/images/pikachu-running.gif'

export default function LoadingScreen() {
    return (
        <div className="loading screen">
            <div className="loading-container">
                <div className="loading-image-container">
                    <img className='loading-gif' src={pikachuRunning} alt="Pikachu running" />
                </div>
                <div className="progress-bar-container">
                    <div className="progress-bar"></div>
                </div>
            </div>
        </div>
    )
}