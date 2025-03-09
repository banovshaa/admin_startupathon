import { PropsWithChildren } from "react";
import styles from "./Table.module.scss";

type TableProps = {
  rowList: Array<{ name: string }>;
} & PropsWithChildren;

const Table = ({ rowList, children }: TableProps) => {
  return (
    <>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              {rowList.map((row, index) => (
                <th key={"row_" + index}>
                  <span>{row.name}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
