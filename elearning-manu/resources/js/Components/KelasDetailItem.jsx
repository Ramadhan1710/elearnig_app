import React from 'react';

const KelasDetailItem = ({ rows }) => {
  return (
    <div className="mx-4 my-2 text-gray-600 dark:text-white">
      <table className="">
        {rows.map((row) => (
          <tr>
            <td>
              <b>{row.title}</b>
            </td>
            <td>: {row.content}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default KelasDetailItem;
