import React, { useState, useRef } from 'react';

import Chatroom from './Components/Chatroom/Chatroom';

import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
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
  Flex
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCWCn-Oc5gW0TnGBkRuF2nvIBWfS8TbiYc",
  authDomain: "letsalltalk-19666.firebaseapp.com",
  projectId: "letsalltalk-19666",
  storageBucket: "letsalltalk-19666.appspot.com",
  messagingSenderId: "338237402663",
  appId: "1:338237402663:web:fd5fa4ee0d1511134ea802",
  measurementId: "G-40J3105NBK"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

function App() {

  const [user] = useAuthState(auth)

  return (
    <ChakraProvider theme={theme}>
      {!user ? 
      <>
      <VStack p={4} >
      <ColorModeSwitcher alignSelf='flex-end'/>
      </VStack>

      <SimpleGrid columns={[1, 2, 2]} >

      <VStack spacing={6} pt={[32, 32, 64]}>
        <Heading fontWeight={"extrabold"} size={"2xl"} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip="text">Let's All Talk</Heading>
        <Text fontWeight="semibold" as='i'>One chat room, for everyone.</Text>
        <SignIn />
      </VStack>

      <Box boxSize='lg' w={[0, '390px', '500px']} pt={[0, 0, 16]}>
        <Image src={"./ChatLogo.svg"} />
      </Box>

      </SimpleGrid>
      </> : <>
      <Flex flexDirection="column" w={'80vw'} ml={"10vw"}>
      <HStack >
      <Heading p={8} fontWeight={"extrabold"} size={"xl"} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip="text">Let's All Talk</Heading>
      <SignOut />
      <ColorModeSwitcher  />
      </HStack>
      <VStack>
        <Chatroom auth={auth} firestore={firestore} />
      </VStack>
      </Flex>
      </>
      } 
    </ChakraProvider>
  );
}

const SignIn = () => {
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider)
  }
  return (
    <>
      <Button onClick={signInWithGoogle}>Sign in with google</Button>
    </>
  )
}

const SignOut = () => {
  return auth.currentUser && (
    <Button onClick={() => { auth.signOut() }} >Sign out</Button>
  )
}
export default App;
