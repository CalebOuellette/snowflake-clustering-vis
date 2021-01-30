import React, { useState, useEffect } from "react";
import { Event, EventPartitionMetaData } from "../../Types";
import styled from "styled-components";

const Q1Value = 1;
const Q2Value = "Caleb";
const Q3Value = "d";

export const QuestionsClusterDepth = ({
  metaData,
}: {
  metaData: EventPartitionMetaData[];
}) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ3] = useState(0);

  useEffect(() => {
    let q1 = 0;
    let q2 = 0;
    let q3 = 0;

    metaData.forEach((p) => {
      // q1
      if (p.id.min <= Q1Value && p.id.max >= Q1Value) {
        q1++;
      }

      // q2
      if (p.sender.min <= Q2Value && p.sender.max >= Q2Value) {
        q2++;
      }
      if (p.receiver.min <= Q2Value && p.receiver.max >= Q2Value) {
        q2++;
      }

      // q3
      if (p.external_id.min <= Q3Value && p.external_id.max >= Q3Value) {
        q3++;
      }
    });
    setQ1(q1);
    setQ2(q2);
    setQ3(q3);
  }, [metaData]);

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
        transaction with id of 1?
      </h4>
      <AnswerText showAnswers={showAnswers}>{q1}</AnswerText>
      <h4>
        How many partitions would a query have to look though to find the
        transactions that "Caleb" is involved with?
      </h4>
      <AnswerText showAnswers={showAnswers}>{q2}</AnswerText>
      <h4>
        How many partitions would a query have to look though to find the
        transaction with external_id of abc?
      </h4>
      <AnswerText showAnswers={showAnswers}>{q3}</AnswerText>
    </div>
  );
};

const AnswerText = styled.div<{ showAnswers: boolean }>`
  color: ${(props) => (props.showAnswers ? "black" : "white")};
`;
