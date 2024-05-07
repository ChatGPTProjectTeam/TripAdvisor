import React, {useState} from 'react';
import styles from './IntroPage.module.css';
import ChatCreateButton from "./ChatButton.jsx";
import chatData from "../frontDB/chatLog.json";
import {useNavigate} from "react-router-dom";  // Import the CSS module

function IntroPage() {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth; // Set initial width
    canvas.height = window.innerHeight; // Set initial height

    // Canvas drawing logic
    const TOTAL = 100;
    const petalArray = [];

    const petalImg = new Image();
    petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png';
    petalImg.addEventListener('load', () => {
      for (let i = 0; i < TOTAL; i++) {
        petalArray.push(new Petal());
      }
      render();
    });

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petalArray.forEach(petal => petal.animate());
      window.requestAnimationFrame(render);
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    let mouseX = 0;
    function touchHandler(e) {
      mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth;
    }
    window.addEventListener('mousemove', touchHandler);
    window.addEventListener('touchmove', touchHandler);

    // Petal class
    class Petal {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = (Math.random() * canvas.height * 2) - canvas.height;
        this.w = 25 + Math.random() * 15;
        this.h = 20 + Math.random() * 10;
        this.opacity = this.w / 40;
        this.flip = Math.random();

        this.xSpeed = 1.5 + Math.random() * 2;
        this.ySpeed = 1 + Math.random();
        this.flipSpeed = Math.random() * 0.03;
      }

      draw() {
        if (this.y > canvas.height || this.x > canvas.width) {
          this.x = -petalImg.width;
          this.y = (Math.random() * canvas.height * 2) - canvas.height;
          this.xSpeed = 1.5 + Math.random() * 2;
          this.ySpeed = 1 + Math.random();
          this.flip = Math.random();
        }
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(
          petalImg,
          this.x,
          this.y,
          this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)),
          this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
        );
      }

      animate() {
        this.x += this.xSpeed + mouseX * 5;
        this.y += this.ySpeed + mouseX * 2;
        this.flip += this.flipSpeed;
        this.draw();
      }
    }

  }, []); // Empty dependency array to run only once on mount

const ChatCreateButton = () => { // Use '=' instead of '=>' for function declaration
    // const [chats, setChats] = useState(chatData.chats);
    const navigate = useNavigate();
    function handleCreateChat() {
        navigate('/create_form');
    }

    return (
        <div style={{display: 'flex'}}>
            <button onClick={handleCreateChat} className={`button-64 ${styles.sidebarButton}`}>
                <span className="text">가고 싶어</span>
            </button>
        </div>
    );
}


  return (
    <div style={{ flex: '4', position: 'relative' }}>
      <div className={styles['canvas-container']} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
        <h1 style={{ color: 'white' }}>일본가고 싶니?</h1>
        <div style={{display:'flex', justifyContent:'center', marginTop:'80px'}}>
          <ChatCreateButton/>
        </div>
      </div>
    </div>
  );
}

export default IntroPage;
