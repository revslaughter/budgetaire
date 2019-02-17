import React from "react";

const Register = props => (
  <div>
    <table>
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
    </table>
  </div>
);

export default Register;
