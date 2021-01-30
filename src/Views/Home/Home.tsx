import React, { useState, useEffect } from "react";
import { EventTable } from "./EventTable";
import { MicroPartitions } from "./MicroPartitions";
import { QuestionsClusterDepth } from "./QuestionsClusterDepth";
import { Event, EventKeys, EventPartitionMetaData } from "../../Types";
import { splitToChunks, findMax } from "../../utils";

const PARTITION_COUNT = 4;

const Events: Event[] = [
  { id: 1, sender: "caleb", receiver: "bob", amount: 90, external_id: "a" },
  { id: 2, sender: "chris", receiver: "bob", amount: 90, external_id: "b" },
  { id: 3, sender: "caleb", receiver: "michael", amount: 90, external_id: "c" },
  { id: 4, sender: "michael", receiver: "bob", amount: 90, external_id: "d" },
  { id: 5, sender: "caleb", receiver: "bob", amount: 90, external_id: "e" },
  { id: 6, sender: "suet", receiver: "bob", amount: 90, external_id: "e" },
  { id: 7, sender: "caleb", receiver: "bob", amount: 90, external_id: "f" },
  { id: 8, sender: "caleb", receiver: "cathy", amount: 90, external_id: "g" },
  { id: 9, sender: "caleb", receiver: "bob", amount: 90, external_id: "h" },
  { id: 10, sender: "caleb", receiver: "bob", amount: 90, external_id: "i" },
  { id: 11, sender: "caleb", receiver: "bob", amount: 90, external_id: "j" },
  { id: 12, sender: "caleb", receiver: "bob", amount: 90, external_id: "k" },
  { id: 13, sender: "caleb", receiver: "bob", amount: 90, external_id: "l" },
  { id: 14, sender: "caleb", receiver: "bob", amount: 90, external_id: "m" },
  { id: 15, sender: "caleb", receiver: "bob", amount: 90, external_id: "n" },
];

export const Home = () => {
  const [startingData, setStartingData] = useState(Events);
  const [sort, setSort] = useState<keyof Event>("receiver");
  const [sortedData, setSortedData] = useState(startingData);
  const [partitions, setPartitions] = useState<Event[][]>([]);
  const [partitionMetaData, setPartitionMetaData] = useState<
    EventPartitionMetaData[]
  >([]);

  useEffect(() => {
    setSortedData(startingData.sort((a, b) => (a[sort] > b[sort] ? 1 : -1)));
  }, [sort, startingData]);

  useEffect(() => {
    const partitions = splitToChunks(sortedData, PARTITION_COUNT);
    setPartitions(partitions);
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
      <EventTable events={sortedData} />
      <MicroPartitions metaData={partitionMetaData} partitions={partitions} />
      <QuestionsClusterDepth metaData={partitionMetaData} />
    </div>
  );
};
