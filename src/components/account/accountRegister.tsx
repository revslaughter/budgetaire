import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AppStore from "../../store";
import { Table } from "reactstrap";
import { Account } from "../../utils";

interface RegisterProps {
  name: string;
  account: Account;
  className?: string;
  ascending?: boolean;
}
interface RegisterState {
  account: Account;
}

const Register = (props: RegisterProps) => {
  const [state, setState] = useState<RegisterState>({
    account: props.account
  });
  
  useEffect(() => {
    AppStore.on("transaction", () =>
      setState({
        account: props.account
      })
    );
    return () => {
      AppStore.removeAllListeners();
    };
  });

  return (
    <div className={props.className}>
      <Table striped hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amt</th>
            <th>Bal</th>
          </tr>
        </thead>
        <tbody>
          {state.account.register.map((t, i) => (
            <tr key={`${state.account.name}${i}${t.date}`}>
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
};

export default Register;
