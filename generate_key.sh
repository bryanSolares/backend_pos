ssh-keygen -t rsa -b 4096 -m PEM -f private_key.key
openssl rsa -in private_key.key -pubout -outform PEM -out public.key.pub
