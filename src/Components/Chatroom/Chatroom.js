import React, { useState, useRef, useEffect } from 'react';
import firebase from "firebase/compat/app";
import 'firebase/firestore';
import 'firebase/compat/auth';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  HStack,
  Code,
  Grid,
  theme,
  Heading,
  Button,
  SimpleGrid,
  Image,
  Flex,
  List,
  ListItem,
  Avatar,
  Input,
  Divider,
  Spacer
} from '@chakra-ui/react';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";

const Chatroom = (props) => {
    const dummy = useRef();
    const messagesRef = props.firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt');

    const [messages] = useCollectionData(query, {idField: 'id'})

    const [formValue, setFormValue] = useState("");

    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    })

    const ChatMessage = (props) => {
        const { text, uid, photoUrl } = props.message
        
        const messageClass = uid === props.auth.currentUser.uid ? 'sent' : 'recieved'

        return (
            <ListItem pb={2} w={['90vw', '75vw', '50vw']}>
                
                {messageClass == "sent" ? <>
                <Flex >
                <Spacer />
                <HStack spacing={2} alignSelf={"right"}>
                <VStack >
                <Text id="textmessage" fontSize={"md"}>
                    {text}
                </Text>
                </VStack>
                <Avatar name={uid} />
                </HStack>
                </Flex>
                <Divider pt={2}/>
                </> : <>
                <HStack spacing={2}>
                <Avatar name={uid} />
                <VStack>
                <Text id="textmessage" fontSize={"md"}>
                    {text}
                </Text>
                </VStack>
                </HStack>
                <Divider pt={2}/>
                </>}
                
                
            </ListItem>
        )
    }

    const sendMessage = async (e) => {
        e.preventDefault();

        const {uid} = props.auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        })

        setFormValue('')
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <VStack>
        <List>
            {messages && messages.map(msg => <ChatMessage auth={props.auth} key={msg.id} message={msg} />)}
            <span ref={dummy}></span>
            
        </List>
        <form onSubmit={!formValue ? {} : sendMessage}> 
        <HStack>
        <Input  w={['85vw', '70vw', '45vw']} bottom={0} size='lg' value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Press enter to send" />
        <Button size="lg" type="submit" disabled={!formValue}>Send</Button>
        </HStack>
        </form>
        </VStack>


    )
}


export default Chatroom
