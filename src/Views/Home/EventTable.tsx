import React from "react";
import { Event } from "../../Types/Event";
import styled from "styled-components";
export const EventTable = ({ events }: { events: Event[] }) => {
  return (
    <Table>
      <TR>
        <th>id</th>
        <th>external_id</th>
        <th>sender</th>
        <th>receiver</th>
        <th>amount</th>
      </TR>
      {events.map((e) => (
        <TR key={e.id}>
          <Td>{e.id}</Td>
          <Td>{e.external_id}</Td>
          <Td>{e.sender}</Td>
          <Td>{e.receiver}</Td>
          <Td>{e.amount}</Td>
        </TR>
      ))}
    </Table>
  );
};

const Td = styled.td`
  flex: 1;
  text-align: center;
  padding: 3px;
`;

const TR = styled.tr`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
`;
