import React from 'react';
import Typography from 'components/typography';

const { Title, Text } = Typography;

interface AuthorPropsInterface {
  id?: number;
  username: string;
  photoUrl: string;
  subtitle?: string;
  photoSize?: 'normal' | 'small';
}

const Author = ({
  id,
  username,
  photoUrl,
  subtitle,
  photoSize,
}: AuthorPropsInterface): JSX.Element => {
  const sizeFunc = () => {
    switch (photoSize) {
      default:
      case 'normal':
        return '2.5rem';
      case 'small':
        return '2rem';
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div
          style={{
            backgroundImage: `url(${photoUrl})`,
            width: sizeFunc(),
            height: sizeFunc(),
          }}
          className="bg-cover bg-center rounded-full"
        />
        <div className="flex flex-col justify-center ml-2">
          <Title level={5}>{username}</Title>
          {subtitle && (
            <Text type="secondary" className="text-xs whitespace-nowrap">
              {subtitle}
            </Text>
          )}
        </div>
      </div>
    </>
  );
};

Author.defaultProps = {
  id: null,
  photoSize: 'normal',
  subtitle: '',
};

export default Author;
