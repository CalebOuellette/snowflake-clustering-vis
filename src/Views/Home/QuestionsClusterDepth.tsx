import React, { useState, useEffect } from "react";
import { EventPartitionMetaData } from "../../Types";
import styled from "styled-components";

export const QuestionsClusterDepth = ({
  metaData,
}: {
  metaData: EventPartitionMetaData[];
}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState(0);

  const [Q1Value, setQ1Value] = useState(15);
  const [Q2Value, setQ2Value] = useState("nick");
  const [Q3Value, setQ3Value] = useState("EEEE");

  useEffect(() => {
    let q1count = 0;
    let q2count = 0;
    let q3count = 0;

    metaData.forEach((p) => {
      // q1
      if (p.id.min <= Q1Value && p.id.max >= Q1Value) {
        q1count++;
      }

      // q2count
      if (
        (p.sender.min <= Q2Value && p.sender.max >= Q2Value) ||
        (p.receiver.min <= Q2Value && p.receiver.max >= Q2Value)
      ) {
        q2count++;
      }

      // q3
      if (p.external_id.min <= Q3Value && p.external_id.max >= Q3Value) {
        q3count++;
      }
    });
    setQ1(q1count);
    setQ2(q2count);
    setQ3(q3count);
  }, [metaData, Q1Value, Q2Value, Q3Value]);

  return (
    <div>
      <h2>Questions</h2>
      <button
        onClick={() => {
          setShowAnswers(!showAnswers);
        }}
      >
        Show Answers
      </button>
      <h4>
        How many partitions would a query have to look though to find the
        transaction with id of
        <input
          type="numeric"
          value={Q1Value}
          onChange={(e) => setQ1Value(parseInt(e.target.value))}
        />
        ?
      </h4>
      <AnswerText showAnswers={showAnswers}>{q1}</AnswerText>
      <h4>
        How many partitions would a query have to look though to find the
        transactions that
        <input
          value={Q2Value}
          onChange={(e) => setQ2Value(e.target.value.toLowerCase())}
        />
        is involved with ({Q2Value} == sender || {Q2Value} == receiver)?
      </h4>
      <AnswerText showAnswers={showAnswers}>{q2}</AnswerText>
      <h4>
        How many partitions would a query have to look though to find the
        transaction with external_id of
        <input
          value={Q3Value}
          onChange={(e) => setQ3Value(e.target.value.toUpperCase())}
        />
        ?
      </h4>
      <AnswerText showAnswers={showAnswers}>{q3}</AnswerText>
    </div>
  );
};

const AnswerText = styled.div<{ showAnswers: boolean }>`
  color: ${(props) => (props.showAnswers ? "black" : "white")};
`;
