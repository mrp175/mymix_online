import { useEffect, useRef, useState } from "react";
import "./LoadingAnimation.scss";

interface divRefObject {
  [key: string]: HTMLDivElement | null;
}

type SetCount = React.Dispatch<React.SetStateAction<number>>;

export default function LoadingAnimation() {
  const [html, setHtml] = useState<JSX.Element[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const divRefObj = useRef<divRefObject>({});
  const [pointsArray, setPointsArray] = useState<number[]>([]);
  const arr = [1, 0.6, 0.3, 0.2, 0.1, 0.05, 0.02];

  function concatPointsArray(): number[] {
    let points: number[] = [];
    for (let i = 0; i < 3; i += 1) {
      points = points.concat(arr);
    }
    // const empty = new Array(7).fill(0.01);
    // points = empty.concat(arr).concat(empty);
    return points;
  }

  function createDivs(
    pointsArray: number[],
    refObj: React.MutableRefObject<divRefObject>
  ): void {
    let divs: JSX.Element[] = [];
    pointsArray.forEach(function (cur, i) {
      divs.push(
        <div
          id={`_${i}`}
          className="LoadingAnimation__bar"
          ref={(element) => (refObj.current["_" + i] = element)}
        ></div>
      );
    });
    setHtml(divs);
  }

  useEffect(
    function () {
      if (divRefObj.current["_1"]) {
        intervalRef.current = setInterval(function () {
          console.log("hello");
          animate(countRef, setCount, divRefObj);
        }, 200);
      }
      return function () {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    },
    [html]
  );

  function animate(
    countRef: React.MutableRefObject<number>,
    setCount: SetCount,
    refObj: React.MutableRefObject<divRefObject>
  ): void {
    const count = countRef.current;
    for (let i = count; i < pointsArray.length; i += 1) {
      let item = count + i;
      if (item > pointsArray.length - 1) {
        item = item - pointsArray.length;
      }
      if (i === 0) {
      }
      const div = refObj.current["_" + item]!;
      div.style.transform = `scaleY(${pointsArray[i]})`;
    }

    for (let i = 0; i < count; i += 1) {
      let item = count + i;
      if (item > pointsArray.length - 1) {
        item = item - pointsArray.length;
      }

      const div = refObj.current["_" + item]!;
      div.style.transform = `scaleY(${pointsArray[i]})`;
    }

    if (count === 20) {
      setCount(0);
    } else {
      setCount((state) => {
        return state + 1;
      });
    }
  }

  useEffect(
    function () {
      countRef.current = count;
    },
    [count]
  );

  useEffect(function () {
    setPointsArray(concatPointsArray);
  }, []);

  useEffect(
    function () {
      createDivs(pointsArray, divRefObj);
    },
    [pointsArray]
  );

  return (
    <div className="LoadingAnimation__container">
      <div className="LoadingAnimation">{html}</div>
    </div>
  );
}
