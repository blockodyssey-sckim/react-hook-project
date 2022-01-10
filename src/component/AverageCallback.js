import React, { useState, useMemo, useCallback } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산중..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  // 아래와 같은 함수는 리렌더링 될 때 새로 생성합니다.
  // 함수 생성에 대한 부하도 있지만,
  // 해당 함수를 자식 컴포넌트에게 props로 전달하게 되면 reder.Memo를 사용하더라도
  // props가 변한 걸로 판단하여 리렌더링 됩니다.
  // 해결방안
  console.log(number);
  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  const onInsert = useCallback(() => {
    console.log(number);
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  }, [list, number]);

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
