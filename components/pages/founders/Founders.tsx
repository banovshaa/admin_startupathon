"use client";

import DefaultHeader from "@/components/shared/DefaultHeader/DefaultHeader";
import Table from "@/components/shared/Table/Table";
import styles from "./Founders.module.scss";
import { useEffect, useState } from "react";
import AddFounderModal from "./AddFounderModal/AddFounderModal";
import { FounderType } from "@/interfaces/dashboard.interfaces";
import { getAllFoundersRequest } from "@/services/founders.service";

const tableRowList = [
  {
    name: "S.No",
  },
  {
    name: "Profile",
  },
  {
    name: "Position",
  },
  {
    name: "LinkedIn",
  },
  {
    name: "Bio & Highlights",
  },
];

const Founders = () => {
  const [modal, setModal] = useState(false);
  const [founders, setFounders] = useState<FounderType[]>([]);

  const get = async () => {
    const { data, status } = await getAllFoundersRequest();

    if (status === 200) {
      const foundersData = data.founders;

      setFounders(foundersData);
    }
  };

  useEffect(() => {
    get();
  }, []);
  return (
    <>
      <DefaultHeader
        options={{
          title: "Founders Management",
          buttons: [
            {
              name: "Add founder",
              onClick: () => setModal(true),
            },
          ],
        }}
      />
      <div className={styles.founders}>
        <Table rowList={tableRowList}>
          {founders.map((founder, index) => (
            <tr key={founder._id}>
              <td>
                <span>{index + 1}</span>
              </td>
              <td>
                <span>
                  {founder.firstName} {founder.lastName}
                </span>
              </td>
              <td>
                <span>{founder.position}</span>
              </td>
              <td>
                <span>{founder.linkedInUrl}</span>
              </td>
              <td>
                <span>{founder.description}</span>
              </td>
            </tr>
          ))}
        </Table>
      </div>
      <AddFounderModal
        state={modal}
        setState={setModal}
        setData={setFounders}
      />
    </>
  );
};

export default Founders;
