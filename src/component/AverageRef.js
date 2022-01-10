import React, { useState, useMemo, useCallback, useRef } from "react";

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
  //useRef 속 current 프로퍼티의 값은 리렌더링이 되도 변하지 않습니다.
  //따라서 지역번수로 사용할 수 있고,
  // dom 컴포넌트에 ref props로 전달해 element object를 가져올 수 있습니다.

  const inputEl = useRef(null);
  const countRef = useRef(0);
  countRef.current = countRef.current + 1;
  console.log(countRef.current);

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []);

  const onInsert = useCallback(() => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
    console.log(inputEl.current);
    //Element Obj를 가져와서 포커스를 부여하는 부분
    inputEl.current.focus();
  }, [list, number]);

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
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
