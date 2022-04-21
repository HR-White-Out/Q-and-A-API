module.exports = function AnswerPhotos(sequelize, DataTypes) {
  return sequelize.define('answer_photos', {
    photo_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    answer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'answers',
        key: 'answer_id',
      },
    },
    photo_url: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'answer_photos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'answer_photos_pkey',
        unique: true,
        fields: [
          { name: 'photo_id' },
        ],
      },
    ],
  });
};
