import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

import AuthActions from '~/store/ducks/auth';

import styles from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(AuthActions.signInRequest(email, password));
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <View>
        <Text style={styles.title}>Entrar</Text>

        <Text style={styles.label}>E-MAIL</Text>
        <TextInput
          value={email}
          onChangeText={value => setEmail(value)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          autoFocus
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <Text style={styles.label}>SENHA</Text>
        <TextInput
          value={password}
          onChangeText={value => setPassword(value)}
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
          returnKeyType="send"
          ref={passwordRef}
          onSubmitEditing={handleSubmit}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
