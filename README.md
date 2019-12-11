# Big Data As A Service (BDaaS) and Function As A Service (FaaS) in Online Multiplayer Survival Games

## Abstract  
With the advent of cloud computing and big data, more and more services are emerging on the internet. The introduction of online games, huge amounts of data are available. In this project, we discuss the implementation of services which we call BDaaS (Big Data as a service) and Function as a Service (FaaS), where we perform analytics on data retrieved through an online multiplayer game called CS GO. First, we introduce our problem statement. Next, we discuss the architecture of our system. Furthermore, we discuss the platform on which our system was implemented. Finally, we share the implementation details. 

## Introduction / Problem 
There are more than 2 billion video game players in the world, and Electronic Arts, who has 275 million active users, generating approximately 50 terabytes of data each day. The gaming industry does $ 20 billion in annual revenue in America alone of which 2 billion in sub-category social games.  In the USA, the gaming industry is bigger than the movie industry (with an annual amount of $ 8 billion spent on movie tickets). The world of gaming is big, growing rapidly and taking full advantage of Big Data technologies. The gaming industry uses Big Data to drive customer engagement, make more money on advertising and optimize the gaming experience.

As with any organization, also the 360-degree customer view is important for the gaming industry. Fortunately, gamers leave a massive data trail when they play a game. Whether it is an online social game connected via Facebook, a game played on an offline PlayStation or a multiplayer game via the Xbox, a lot of data is created in different formats when gamers start playing. They create massive data streams about everything they do within a game. How they interact, how long they play, when they play, with whom, how much they spend on virtual products, with whom they chat etc. If the gaming profile is linked to social networks or a gamer is asked to enter demographic data, the information can be enriched with what the gamer likes in real life and gaming companies can adapt the game in real life to the profile of the gamer.

Engagement can also be increased if analytics show that a player will abandon the game if the first levels are too difficult or if later levels are too easy. Data can be used to find bottlenecks within the game, where many players fail the tasks at hand. Or it can be used to find the areas that are too easy and need to be improved. Analyzing millions of player data gives insight into which elements of the game are most popular. It can show what elements are unpopular and requires action to improve the game. Constant engagement is vital and with the right tools, the right reward can be provided at the right moment for the right person within the game to keep a player engaged. 

Hence, Big-Data analytics provides game developers with a deep insight into the behavior of the game players. However, most gaming companies do not provide motivated game developers with the data or a platform to store and retrieve that data. We have developed a system that can provide developers with the data regarding various game events (Kills, Headshots, K/D Ratio, etc.) Also, we provide a platform to store and retrieve this information in order to perform big-data analytics.  

## Logical Design / Architecture 

![Architecture](/.images/Architecture.png)

The architecture consists of four computers in total, out of which we made a cluster of three computers and the fourth computer is acting as the client. We chose cluster computing for this purpose because it fulfilled all of our requirements for High-Performance computing to perform big data analytics. Moreover, we used various cloud computing open-source software utilities, namely, Apache Hadoop, Apache Spark, and Apache HBase. In addition to this, the client machine and Apache HBase are communicating through Restful Web-Services. In order to get the real-time game-events data, we are using the Overwolf API which provides us withthe data of more than sixteen popular games such as (PUBG, CS: GO, Fortnite, etc.) The application developed by us runs in the Overwolf client which runs on top of the game in the client machine. The application in the Overwolf client machine communicates with the master node through Node.JS, which is an open-source, cross-platform, JavaScript runtime environment for writing command-line tools for server-side scripting.

## Platform
1. **Node.JS server:** For receiving events data in JSON format.
1. **HBase:** A distributed, scalable platform to store events data. It provides a fault-tolerant way of storing Big Data.
1. **Spark:** A cluster-computing framework for large scale parallel data processing. In our case, Spark runs on top of YARN.
1. **Hadoop Distributed File System:** Primary data storage used by hadoop applications. Uses namenode and datanode to implement a distributed file system that provides high performance data access at scale. HDFS uses master/slave architecture. In its initial incarnation, each Hadoop cluster consisted of a single NameNode that managed file system operations and supporting DataNodes that managed data storage on individual compute nodes.
1. **Yet Another Resource Negotiator:**  A large-scale distributed operating system used for Big Data processing. Different data processing tasks like like graphs, interactive, stream as well as batch processing are processed in HDFS, thus making them much more efficient.

## Implementation:
![Flowchart](/.images/flowchart.png)

#### 1. Client-Side
  Every client will download the OverWolf client. Overwolf client allows users to run an app available in OverWolf play store. Developers build apps and publish them on OverWolf Appstore. Also, Whitelisted developers can run game which is not published on play store. We being whitelisted developers have developed an application and put it in the OverWolf client, which will launch automatically when the user starts playing CS: GO, and whenever an event occurs in the game, the data of that event goes to our cloud-server. Real-time Events like: when user fires a bullet, from which gun and with how much ammo in it. When we get killed or when user kills another player. When we reload a gun, etc. For Full List of events: [Overwolf Api](https://overwolf.github.io/docs/api/overwolf-games-events-csgo)

  ![CsGO](/.images/csgo.png)


  ![Overwolf](/.images/overwolf.png)

#### 2. Cloud
  We have used 3 PCs in lab 211 to create a cluster. In all 3 nodes Hadoop, YARN, Spark and Hbase are installed. Hadoop allows us to store data in a distributed fashion and also provides options for replication. Spark is used to run jobs faster. HBase is used to store data for user events that have occurred during the game. It took us a total of 100 hrs to configure/setup the cluster/cloud from scratch!! Also, we have created a server that will respond to get, post requests. It is developed using NodeJS. The real-time events which occur during the game are sent to this server using post request. This server then stores those values in HBase.

  ![Hadoop](/.images/hadoop.png)

  ![Spark](/.images/spark.png)

  ![HBase](/.images/hbase.png)

  ![NJServer](/.images/njserver.png)

#### 3. Services Offered
  * **Real-time Analytics:** When users are playing the game their real-time data is being sent to cloud and cloud runs a spark job (analytics) using that data.
  * **REST API to retrieve data:** Users can retrieve data using our REST API from the HBase database.

## References:
1. https://overwolf.github.io/
1. https://www.linode.com/docs/databases/hadoop/how-to-install-and-set-up-hadoop-cluster/
1. https://www.linode.com/docs/databases/hadoop/install-configure-run-spark-on-top-of-hadoop-yarn-cluster/
1. https://www.guru99.com/hbase-installation-guide.html
1. https://nodejs.org/en/docs/guides/getting-started-guide/
1. https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/
