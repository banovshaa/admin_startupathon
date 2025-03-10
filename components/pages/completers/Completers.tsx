"use client";

import DefaultHeader from "@/components/shared/DefaultHeader/DefaultHeader";
import Table from "@/components/shared/Table/Table";
import styles from "./Completers.module.scss";
import { useContext, useEffect, useState } from "react";
import AddCompleterModal from "./AddCompleterModal/AddCompleterModal";
import { getAllCompletersRequest } from "@/services/completers.service";
import { CompleterType } from "@/interfaces/dashboard.interfaces";
import { LoaderContext } from "@/components/providers/LoaderProvider";

const tableRowList = [
  {
    name: "S.No",
  },
  {
    name: "Project",
  },
  {
    name: "Profile",
  },
  {
    name: "Position",
  },

  {
    name: "Funding",
  },
  {
    name: "Profile Picture",
  },
  {
    name: "LinkedIN",
  },
  {
    name: "Description",
  },
];

const Completers = () => {
  const [modal, setModal] = useState(false);
  const [completers, setCompleters] = useState<CompleterType[]>([]);
  const { setLoading } = useContext(LoaderContext);

  const get = async () => {
    setLoading(true);
    const { data, status } = await getAllCompletersRequest();
    if (status === 200) {
      const completerData = data.completers;

      setCompleters(completerData);
    }
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);
  return (
    <>
      <DefaultHeader
        options={{
          title: "Completers Management",
          buttons: [
            {
              name: "Add completer",
              onClick: () => setModal(true),
            },
          ],
        }}
      />
      <div className={styles.completers}>
        <Table rowList={tableRowList}>
          {completers &&
            completers.map((completer: CompleterType, index: number) => (
              <tr key={completer._id}>
                <td>
                  <span>{index + 1}</span>
                </td>
                <td>
                  <span>{completer.projectName}</span>
                </td>
                <td>
                  {completer.firstName} {completer.lastName}
                </td>
                <td>
                  <span>{completer.position}</span>
                </td>
                <td>
                  <span>{completer.fundingAmount}</span>
                </td>
                <td>
                  <span>{completer.profilePicture}</span>
                </td>
                <td>
                  <span>{completer.linkedInUrl}</span>
                </td>
                <td>
                  <span>{completer.description}</span>
                </td>
              </tr>
            ))}
        </Table>
      </div>
      <AddCompleterModal
        state={modal}
        setState={setModal}
        setData={setCompleters}
      />
    </>
  );
};

export default Completers;
