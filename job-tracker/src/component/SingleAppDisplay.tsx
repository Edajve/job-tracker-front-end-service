import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ApplicationEditor from "./ApplicationEditor";
import ApplicationShape from "../types/Excel";
import apiClient from "../services/http-client";

interface Props {
  idOfChoosenApp: string;
}

export interface updateColumnQuery {
  applicationID: string;
  applicationColumn: string;
  applicationNewEntry: string;
}

const SingleAppDisplay = ({ idOfChoosenApp }: Props) => {
  const [application, setApplication] = useState<ApplicationShape>(
    {} as ApplicationShape
  );
  const [editButton, setEditButton] = useState(false);
  const [apiQuery, setApiQuery] = useState<updateColumnQuery>(
    {} as updateColumnQuery
  );

  useEffect(() => {
    let aSingleApplication: ApplicationShape;
    apiClient
      .get(`/api/v1/applications/${idOfChoosenApp}`)
      .then((res) => {
        aSingleApplication = res.data.data[0];
        setApplication(aSingleApplication);
      })
      .catch((error) => new Error(error));

    setApiQuery((prevState) => ({
      ...prevState,
      applicationID: application.id,
    }));
  }, [application]);

  const { colorMode } = useColorMode();
  const hoverColor = colorMode === "light" ? "#e8eced" : "#3e3d47";

  const boxStyles = {
    overflow: "hidden",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: hoverColor,
    },
  };

  const clickedOnIndividualDetail = (clickedOnColumn: string) => {
    setApiQuery((state) => ({
      ...state,
      applicationColumn: clickedOnColumn,
    }));
    setEditButton(true);
  };

  if (application === null || application === undefined) return;

  return (
    <>
      {!editButton ? (
        <Card>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {Object.entries(application).map(([key, value]) => (
                <Box
                  sx={boxStyles}
                  onClick={() => clickedOnIndividualDetail(key)}>
                  <Heading size="xs" textTransform="uppercase">
                    {key}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {value}
                  </Text>
                </Box>
              ))}
            </Stack>
          </CardBody>
        </Card>
      ) : (
        <ApplicationEditor
          apiQuery={apiQuery}
          setApiQuery={setApiQuery}
          handleGoingBack={() => setEditButton(!editButton)}
        />
      )}
    </>
  );
};

export default SingleAppDisplay;
