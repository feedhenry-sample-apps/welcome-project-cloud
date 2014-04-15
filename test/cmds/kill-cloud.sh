#!/bin/bash
kill $(ps aux | grep '[n]ode application.js' | awk '{print $2}')