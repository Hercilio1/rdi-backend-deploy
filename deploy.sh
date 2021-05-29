cd ../
rsync -av --progress backend/ rdi-backend-deploy --exclude .git/ --exclude node_modules/ --delete