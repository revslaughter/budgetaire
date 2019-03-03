import React, { useState, useEffect } from "react";
import AppStore from "../../store";
import { Table } from "reactstrap";
import { Account, AccountTransaction } from "../../utils";
import styled from "styled-components";

interface RegisterProps {
  name: string;
  account: Account;
  className?: string;
  ascending?: boolean;
  store: AppStore;
}
interface RegisterState {
  account: Account;
  register: AccountTransaction[];
}

const sorter = (oneTx: AccountTransaction, anotherTx: AccountTransaction) => {
  if (oneTx.date > anotherTx.date) {
    return -1;
  } else if (oneTx.date < anotherTx.date) {
    return 1;
  } else {
    return 0;
  }
};

const Register = (props: RegisterProps) => {
  const [state, setState] = useState<RegisterState>({
    account: props.account,
    register: props.account.register.slice().sort(sorter)
  });

  useEffect(() => {
    props.store.on("transaction", () =>
      setState({
        account: props.account,
        register: props.account.register.slice().sort(sorter)
      })
    );
  }, []);

  return (
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
          {state.register.map((t, i) => (
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

export default styled(Register)`
  background-color: #fddcff;
  border-radius: 0.5rem;
`;
