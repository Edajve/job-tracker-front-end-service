import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button, List, ListIcon, ListItem } from "@chakra-ui/react";

const ListActions = () => {
  return (
    <List spacing={4} paddingTop={12}>
      <ListItem>
        <Button>
          <ListIcon as={AddIcon} color="green.500" />
          Add Application
        </Button>
      </ListItem>
      <ListItem>
        <Button>
          <ListIcon as={DeleteIcon} color="green.500" />
          Delete Application
        </Button>
      </ListItem>
    </List>
  );
};

export default ListActions;
