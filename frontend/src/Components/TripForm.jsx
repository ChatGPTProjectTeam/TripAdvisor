import React, {useEffect, useState} from 'react'
import dummy from '../frontDB/chatLog.json'

function TripForm() {
    // const regionData = dummy.form.find(item => item.id === id);
  return (
      <div>
          <div>
              <h1 style={{fontSize:'40px'}}>아래의 내용들을 선택 혹은 입력해주세요</h1>
          </div>
          <div>
              <div style={{fontSize:'20px', paddingTop: '20px'}}>
                  혹시 MBTI가 T(Thinking) 혹은 F(Feeling)인가요?
              </div>

          </div>
      </div>
  )
}

export default TripForm