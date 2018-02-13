#!/bin/bash
PID=`ps -ef | grep 'python' | grep 'second' | awk '{print $2}'`
if [ "" == "$PID" ]
  then echo "no python process"
  else 
    kill $PID
    sleep 1
fi

PID=`ps -ef | grep 'mosca' | grep -v 'grep' | awk '{print $2}'`
if [ "" ==  "$PID" ]
  then echo "no mosca process"
  else
    kill $PID
    sleep 1
fi

echo "checked.."
rm /home/pi/Documents/second*
echo "remove logs"
/home/pi/.nvm/versions/node/v9.3.0/bin/mosca -v | /home/pi/.nvm/versions/node/v9.3.0/bin/pino > /home/pi/Documents/second.out &
echo "launch mosca"
sleep 5 && /usr/bin/python3 /home/pi/second-1.0.0-gesture.py > /home/pi/Documents/second.py.log &
echo "launch python"
/home/pi/second-1.0.0-armv7l.AppImage > /home/pi/Documents/second.AppImage.log &
echo "launch AppImage"
