import React, { useState, useEffect } from "react";
import { EventTable } from "./EventTable";
import { MicroPartitions } from "./MicroPartitions";
import { QuestionsClusterDepth } from "./QuestionsClusterDepth";
import { Event, EventKeys, EventPartitionMetaData } from "../../Types";
import { splitToChunks, findMax } from "../../utils";
import events from "../../data/t.json";
import styled from "styled-components";
const PARTITION_COUNT = 7;

const Events: Event[] = events;

export const Home = () => {
  const [startingData, setStartingData] = useState(Events);
  const [sort, setSort] = useState<keyof Event>("receiver");
  const [sortedData, setSortedData] = useState(startingData);
  const [partitions, setPartitions] = useState<Event[][]>([]);
  const [partitionMetaData, setPartitionMetaData] = useState<
    EventPartitionMetaData[]
  >([]);

  useEffect(() => {
    const newData = startingData.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
    setSortedData([...newData]);
  }, [sort, startingData]);

  useEffect(() => {
    const partitions = splitToChunks(sortedData, PARTITION_COUNT);
    setPartitions([...partitions]);
  }, [sortedData]);

  useEffect(() => {
    const metaData = partitions.map((events) => {
      const data: EventPartitionMetaData = {
        id: { min: 0, max: 1 },
        sender: { min: 0, max: 1 },
        receiver: { min: 0, max: 1 },
        amount: { min: 0, max: 1 },
        external_id: { min: 0, max: 1 },
      };

      EventKeys.forEach((key) => {
        const [min, max] = findMax(events, key);
        data[key] = { min, max };
      });
      return data;
    });
    setPartitionMetaData(metaData);
  }, [partitions]);

  return (
    <div>
      <h1>Snowflake Clustering Visualization</h1>
      <HandleSort sort={sort} setSort={setSort} />
      <EventTable events={sortedData} />
      <MicroPartitions metaData={partitionMetaData} partitions={partitions} />
      <QuestionsClusterDepth metaData={partitionMetaData} />
    </div>
  );
};

const sortOptions = ["id", "external_id", "receiver", "sender"];

const HandleSort = ({
  sort,
  setSort,
}: {
  sort: string;
  setSort: (s: keyof Event) => void;
}) => {
  return (
    <SortBox>
      <form>
        {sortOptions.map((o) => (
          <div key={o} className="radio">
            <label>
              <input
                type="radio"
                value={o}
                checked={sort === o}
                onChange={(e) => {
                  setSort((e.target.value as unknown) as keyof Event);
                }}
              />
              {o}
            </label>
          </div>
        ))}
      </form>
    </SortBox>
  );
};

const SortBox = styled.div`
  margin: 30px;
`;
