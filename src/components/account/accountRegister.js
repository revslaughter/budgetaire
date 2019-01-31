import React from "react";

const Register = props => (
  <div>
    <p>{props.name}</p>
    <table>
      <th>
        <td>Date</td>
        <td>Type</td>
        <td>Amt</td>
      </th>
      {props.account.register.map((t, i) => (
        <tr key={`${props.name}${i}${t.date}`}>
          <td>{t.date}</td>
          <td className={t.type}>{t.type}</td>
          <td>{t.amount}</td>
        </tr>
      ))}
    </table>
  </div>
);

export default Register;
