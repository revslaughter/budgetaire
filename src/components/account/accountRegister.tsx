import React from "react";
import { Table } from "reactstrap";
import { Account } from "../../utils";

interface RegisterProps {
  name: string;
  account: Account;
  className?: string;
}

const Register = (props: RegisterProps) => (
  <div className={props.className}>
    <Table striped hover>
      <caption>{props.name}</caption>
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
          <tr key={`${props.name}${i}${t.date}`}>
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

export default Register;
