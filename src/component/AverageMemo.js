import React, { useState, useMemo } from "react";

// 평균값을 구합니다.
// 리스트를 가져와서 다 더한 다음 리스트의 배열 수 만큼 나누기
const getAverage = (numbers) => {
  console.log("평균값 계산중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = () => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  // 하단에 getAverage(list)의 경우 리렌더링 되면 무조건 실행합니다.
  // list를 인자로 받아 평균을 구하는데, input의 value를 바꾸기만 해도 setState 때문에 리렌더링 되어
  // list가 변하지 않아도 실행된다.

  //해결방안
  const avg = useMemo(() => getAverage(list), [list]);
  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
