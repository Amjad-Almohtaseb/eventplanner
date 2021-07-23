module.exports = (sequelize, DataTypes) =>
  sequelize.define("Event", {
    organizer: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false, //

      validate: {
        stringLength(value) {
          if (value.length > 20) {
            throw new Error("Organizer must be less than 20 char.");
          }
        },
      },
    },

    name: {
      type: DataTypes.STRING,
      validate: {
        notContains: "event",
      },
    },

    email: {
      type: DataTypes.STRING,

      allowNull: false,

      validate: {
        isEmail: true,
      },
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    numOfSeats: {
      type: DataTypes.INTEGER,

      allowNull: false,

      validate: {
        min: 0,
      },
    },

    bookedSeats: {
      type: DataTypes.INTEGER,

      validate: {
        max(value) {
          if (value > this.numOfSeats) {
            throw new Error("BookedSeats must be less than numOfSeats");
          }
        },
      },
    },

    startDate: {
      type: DataTypes.DATEONLY,

      validate: {
        validation(value) {
          if (this.endDate && !value) {
            throw new Error("StartDate can't be null");
          }
        },
        isAfter: "2021-07-22",
      },
    },

    endDate: {
      type: DataTypes.DATEONLY,

      validation(value) {
        if (this.startDate && !value) {
          throw new Error("EndDate can't be null");
        }
        if (value < this.startDate) {
          throw new Error("Enddate must be after startDate");
        }
      },
    },
  });
