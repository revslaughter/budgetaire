import React from "react";
import { Table } from "reactstrap";
import { Account } from "../../utils";
import styled from "styled-components";

const Register = (props = { account: Account() }) => (
  <div className={props.className}>
    <Table responsive striped hover size="sm">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amt</th>
          <th>Bal</th>
        </tr>
      </thead>
      <tbody>
        {props.account.register.map((t, i) => (
          <tr key={`${props.account.name}${i}${t.date}`}>
            <td>{t.date.toLocaleDateString()}</td>
            <td>{t.type.toUpperCase()}</td>
            <td>{t.amount.formatted()}</td>
            <td>{t.balance ? t.balance.formatted() : null}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default styled(Register)`
  background-color: #fddcff;
  border-radius: 0.5rem;
`;
