https://trello.com/b/odmDMuxt/sprint-authentication

<!-- Answers to the Short Answer Essay Questions go here -->


1. What is the purpose of using _sessions_?
    They are used to allow the server to store information about the client. One of the uses is for authentication and allow the user to remain logged in and access data for a period of time specified by the developer.
        

2. What does bcrypt do to help us store passwords in a secure manner.
    Helps the developer "hash" passwords to make them more secure for storage in the backend. Bcrypt's differtiating factor is the used of a derived key to encrypt known text.


3. What does bcrypt do to slow down attackers?
    Adds time it would take a computer to the decrypte process, 2^n.

4. What are the three parts of the JSON Web Token?
    Header, Payload, Verifing Signature
