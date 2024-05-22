// 'use client';
// import React, { createContext, useContext, useState, useEffect, ReactNode, FC } from 'react';

// interface EncryptionContextType {
//   encrypt: (text: string) => string;
//   decrypt: (text: string) => string;
// }

// const EncryptionContext = createContext<EncryptionContextType | null>(null);

// interface EncryptionProviderProps {
//   children: ReactNode;
//   trialKeyword: string;
// }

// // Generate the cipher alphabet based on a keyword
// const generateCipherAlphabet = (keyword: string) => {
//   keyword = keyword.toUpperCase().replace(/[^A-Z]/g, '');
//   const seen = new Set();
//   const firstPart = [...keyword].filter(char => {
//     if (seen.has(char)) return false;
//     seen.add(char);
//     return true;
//   });
//   const restOfAlphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))
//     .filter(char => !seen.has(char));
//   return firstPart.concat(restOfAlphabet).join('');
// };

// // Fetch the secret keyword from environment variables (server-side)
// const secretKeyword = process.env.REACT_APP_SECRET_KEY || 'DEFAULTKEY';  // Ensure to set REACT_APP_SECRET_KEY in your .env file
// const cipherAlphabet = generateCipherAlphabet(secretKeyword);
// const plainAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// export const EncryptionProvider: FC<EncryptionProviderProps> = ({ children, trialKeyword }) => {
//   const trialCipherAlphabet = generateCipherAlphabet(trialKeyword);

//   const encrypt = (text: string): string => {
//     return text.toUpperCase().split('').map(char => {
//       const index = plainAlphabet.indexOf(char);
//       return index >= 0 ? cipherAlphabet[index] : char;
//     }).join('');
//   };

//   const decrypt = (text: string): string => {
//     return text.toUpperCase().split('').map(char => {
//       const index = trialCipherAlphabet.indexOf(char);
//       return index >= 0 ? plainAlphabet[index] : char;
//     }).join('');
//   };

//   return (
//     <EncryptionContext.Provider value={{ encrypt, decrypt }}>
//       {children}
//     </EncryptionContext.Provider>
//   );
// };

// function convertNodesToString(nodes: ReactNode): string {
//     return React.Children.toArray(nodes).reduce((acc, node) => {
//       if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
//         return acc + node.toString();
//       } else if (React.isValidElement(node) && node.props.children) {
//         return acc + convertNodesToString(node.props.children);
//       } else if (Array.isArray(node)) {
//         return acc + node.map(convertNodesToString).join('');
//       }
//       return acc;
//     }, '');
//   }
  
  
//   // EncryptedText component
//   interface EncryptedTextProps {
//     children: ReactNode;
//   }
  
// // EncryptedText component
// export const EncryptedText: FC<EncryptedTextProps> = ({ children }) => {
//     const { encrypt, decrypt } = useContext(EncryptionContext);
//     const [decryptedText, setDecryptedText] = useState<string>('');
  
//     useEffect(() => {
//       const textToEncrypt = convertNodesToString(children);  // Convert all children to a single string
//       const encrypted = encrypt(textToEncrypt);  // Encrypt the combined string
//       const decrypted = decrypt(encrypted);  // Decrypt the encrypted string
//       setDecryptedText(decrypted);
//     }, [children, encrypt, decrypt]);
  
//     return <span>{decryptedText}</span>;
//   };
  

// // Example usage, showing how to pass the trial keyword dynamically
// const App: FC = () => {
//   const trialKeyword = "trialkey"; // Simulate user entering a trial decryption key

//   return (
//     <EncryptionProvider trialKeyword={trialKeyword}>
//       <h1>
//         <EncryptedText>
//           Hello! This is my website!
//         </EncryptedText>
//       </h1>
//       <p>
//         <EncryptedText>
//           Welcome to the site.
//         </EncryptedText>
//       </p>
//     </EncryptionProvider>
//   );
// };