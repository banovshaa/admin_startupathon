"use client";

import DefaultHeader from "@/components/shared/DefaultHeader/DefaultHeader";
import Table from "@/components/shared/Table/Table";
import styles from "./Dashboard.module.scss";
import { useEffect, useState } from "react";
import AddChallengeModal from "./AddChallengeModal/AddChallengeModal";
import { ChallengeType } from "@/interfaces/dashboard.interfaces";
import { getAllChallengesRequest } from "@/services/challenges.service";

const tableRowList = [
  {
    name: "S.No",
  },
  {
    name: "Title",
  },
  {
    name: "Funding",
  },
  {
    name: "Deadline",
  },
  {
    name: "Description",
  },
  {
    name: "Image",
  },
  {
    name: "Visibility",
  },
];

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [challenges, setChallenges] = useState<ChallengeType[]>([]);

  const get = async () => {
    const { data, status } = await getAllChallengesRequest();

    if (status === 200) {
      const challengeData = data.challenges;

      setChallenges(challengeData);
    }
  };

  useEffect(() => {
    get();
  }, []);
  return (
    <>
      <DefaultHeader
        options={{
          title: "Ongoing Challenges Management",
          buttons: [
            {
              name: "Add ongoing challenge",
              onClick: () => setModal(true),
            },
          ],
        }}
      />
      <div className={styles.dashboard}>
        <Table rowList={tableRowList}>
          {challenges.map((challenge, index) => (
            <tr key={challenge._id}>
              <td>
                <span>{index + 1}</span>
              </td>
              <td>
                <span>{challenge.title}</span>
              </td>
              <td>
                <span>{challenge.fundingAmount}</span>
              </td>
              <td>
                <span>{challenge.deadline}</span>
              </td>
              <td>
                <span>{challenge.description}</span>
              </td>
              <td>
                <span>{challenge.image}</span>
              </td>
              <td>
                <button
                  className={`${styles.status__btn} ${
                    challenge.isVisible ? styles.visible : ""
                  }`}
                >
                  <span>{challenge.isVisible ? "Visible" : "Not Visible"}</span>
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>
      <AddChallengeModal
        state={modal}
        setState={setModal}
        setData={setChallenges}
      />
    </>
  );
};

export default Dashboard;
