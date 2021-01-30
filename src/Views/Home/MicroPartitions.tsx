import React, { useState, useEffect } from "react";
import { Event, EventKeys, EventPartitionMetaData } from "../../Types";
import styled from "styled-components";
import { splitToChunks } from "../../utils";

export const MicroPartitions = ({
  partitions,
  metaData,
}: {
  partitions: Event[][];
  metaData: EventPartitionMetaData[];
}) => {
  return (
    <div>
      <h2>Micro Partitions</h2>
      <Flex>
        {partitions.map((p, i) => (
          <MicroPartition meta={metaData[i]} i={i} events={p} />
        ))}
      </Flex>
    </div>
  );
};

export const MicroPartition = ({
  events,
  i,
  meta,
}: {
  events: Event[];
  i: number;
  meta: EventPartitionMetaData;
}) => {
  const rows = splitToChunks(events, events.length / 3);
  return (
    <PartitionGroup>
      <h3>Partition {i + 1}</h3>
      <h4>Data</h4>
      {EventKeys.map((key) => {
        return (
          <div>
            {key}
            <ColumnTable>
              {rows.map((r) => (
                <tr>
                  {r.map((e) => (
                    <ValueCell key={e.id}>{e[key]}</ValueCell>
                  ))}
                </tr>
              ))}
            </ColumnTable>
          </div>
        );
      })}
      <MetaData meta={meta} events={events} />
    </PartitionGroup>
  );
};

const PartitionGroup = styled.div`
  border: 1px black solid;
  padding: 10px;
  margin: 10px;
`;

const Flex = styled.div`
  display: flex;
`;

const ValueCell = styled.td`
  width: 100px;
  text-align: center;
`;

const ColumnTable = styled.table`
  border: 1px black solid;
  margin: 10px;
`;

const findMax = (events: Event[], key: keyof Event) => {
  if (events.length < 1) {
    return ["", ""];
  }
  let min = events[0][key];
  let max = events[0][key];

  events.forEach((e) => {
    if (e[key] > max) {
      max = e[key];
    }
    if (e[key] < min) {
      min = e[key];
    }
  });
  return [min, max];
};

export const MetaData = ({
  events,
  meta,
}: {
  events: Event[];
  meta?: EventPartitionMetaData;
}) => {
  return (
    <div>
      <h4>Meta Data</h4>
      {EventKeys.map((key) => {
        return (
          <div key={key}>
            <h6>{key} Range</h6> {meta && meta[key].min}-{meta && meta[key].max}
          </div>
        );
      })}
    </div>
  );
};
